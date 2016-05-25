<?php

/* PartKeeprDoctrineReflectionBundle::model.js.twig */
class __TwigTemplate_5f6a723eb441411ac822bd22d0c0018c7f2f98e0fc865c0db2a619d8ee2946d7 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_dbc74a245b040ed5a31230c62413541e026686325171c9648f6568152904f7b5 = $this->env->getExtension("native_profiler");
        $__internal_dbc74a245b040ed5a31230c62413541e026686325171c9648f6568152904f7b5->enter($__internal_dbc74a245b040ed5a31230c62413541e026686325171c9648f6568152904f7b5_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprDoctrineReflectionBundle::model.js.twig"));

        // line 1
        echo "Ext.define('";
        echo twig_escape_filter($this->env, (isset($context["className"]) ? $context["className"] : null), "js", null, true);
        echo "', {
    extend: '";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["parentClass"]) ? $context["parentClass"] : null), "js", null, true);
        echo "',
    alias: 'schema.";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["className"]) ? $context["className"] : null), "js", null, true);
        echo "',

    idProperty: \"@id\",
    fields: [
        ";
        // line 7
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["fields"]) ? $context["fields"] : null));
        $context['loop'] = array(
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        );
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["field"]) {
            // line 8
            echo "        { name: '";
            echo $this->getAttribute($context["field"], "name", array());
            echo "'";
            if ($this->getAttribute($context["field"], "type", array())) {
                echo ", type: '";
                echo twig_escape_filter($this->env, $this->getAttribute($context["field"], "type", array()), "js", null, true);
                echo "'";
            }
            echo "}";
            if ( !$this->getAttribute($context["loop"], "last", array())) {
                echo ",";
            }
            // line 9
            echo "
        ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['field'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 11
        echo "        ";
        if ((twig_length_filter($this->env, $this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "MANY_TO_ONE", array())) > 0)) {
            // line 12
            echo "            ,
            ";
            // line 13
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "MANY_TO_ONE", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["association"]) {
                // line 14
                echo "                { name: '";
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo "',
                reference: '";
                // line 15
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "target", array()), "js", null, true);
                echo "'
                }";
                // line 16
                if ( !$this->getAttribute($context["loop"], "last", array())) {
                    echo ",";
                }
                // line 17
                echo "
            ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['association'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 19
            echo "        ";
        }
        // line 20
        echo "        ";
        if ((twig_length_filter($this->env, $this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "ONE_TO_ONE", array())) > 0)) {
            // line 21
            echo "            ,
            ";
            // line 22
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "ONE_TO_ONE", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["association"]) {
                // line 23
                echo "                { name: '";
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo "',
                reference: '";
                // line 24
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "target", array()), "js", null, true);
                echo "'
                }";
                // line 25
                if ( !$this->getAttribute($context["loop"], "last", array())) {
                    echo ",";
                }
                // line 26
                echo "
            ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['association'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 28
            echo "        ";
        }
        // line 29
        echo "
    ],

    ";
        // line 32
        if ((twig_length_filter($this->env, $this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "ONE_TO_MANY", array())) > 0)) {
            // line 33
            echo "    hasMany: [
    ";
            // line 34
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "ONE_TO_MANY", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["association"]) {
                // line 35
                echo "        {
        name: '";
                // line 36
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo "',
        associationKey: '";
                // line 37
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo "',
        model: '";
                // line 38
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "target", array()), "js", null, true);
                echo "'
        }";
                // line 39
                if ( !$this->getAttribute($context["loop"], "last", array())) {
                    echo ",";
                }
                // line 40
                echo "
    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['association'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 42
            echo "    ],
    ";
        }
        // line 44
        echo "
    ";
        // line 45
        if ((twig_length_filter($this->env, $this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "MANY_TO_MANY", array())) > 0)) {
            // line 46
            echo "    manyToMany: {
    ";
            // line 47
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["associations"]) ? $context["associations"] : null), "MANY_TO_MANY", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["association"]) {
                // line 48
                echo "        ";
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo ": {
            type: '";
                // line 49
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "target", array()), "js", null, true);
                echo "',
            role: '";
                // line 50
                echo twig_escape_filter($this->env, $this->getAttribute($context["association"], "name", array()), "js", null, true);
                echo "',
            field: '@id',
            right: true
        } ";
                // line 53
                if ( !$this->getAttribute($context["loop"], "last", array())) {
                    echo ",";
                }
                // line 54
                echo "    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['association'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 55
            echo "    },
    ";
        }
        // line 57
        echo "
    proxy: {
        type: \"Hydra\",
        url: '";
        // line 60
        if (((isset($context["uri"]) ? $context["uri"] : null) == "")) {
            echo "undefined:";
            echo twig_escape_filter($this->env, (isset($context["className"]) ? $context["className"] : null), "js", null, true);
        } else {
            echo (isset($context["uri"]) ? $context["uri"] : null);
        }
        echo "'
        ";
        // line 61
        if (((isset($context["ignoreIds"]) ? $context["ignoreIds"] : null) == true)) {
            // line 62
            echo "        , ignoreIds: true
        ";
        }
        // line 64
        echo "    }
});
";
        
        $__internal_dbc74a245b040ed5a31230c62413541e026686325171c9648f6568152904f7b5->leave($__internal_dbc74a245b040ed5a31230c62413541e026686325171c9648f6568152904f7b5_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprDoctrineReflectionBundle::model.js.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  338 => 64,  334 => 62,  332 => 61,  323 => 60,  318 => 57,  314 => 55,  300 => 54,  296 => 53,  290 => 50,  286 => 49,  281 => 48,  264 => 47,  261 => 46,  259 => 45,  256 => 44,  252 => 42,  237 => 40,  233 => 39,  229 => 38,  225 => 37,  221 => 36,  218 => 35,  201 => 34,  198 => 33,  196 => 32,  191 => 29,  188 => 28,  173 => 26,  169 => 25,  165 => 24,  160 => 23,  143 => 22,  140 => 21,  137 => 20,  134 => 19,  119 => 17,  115 => 16,  111 => 15,  106 => 14,  89 => 13,  86 => 12,  83 => 11,  68 => 9,  55 => 8,  38 => 7,  31 => 3,  27 => 2,  22 => 1,);
    }
}
/* Ext.define('{{ className }}', {*/
/*     extend: '{{ parentClass }}',*/
/*     alias: 'schema.{{ className }}',*/
/* */
/*     idProperty: "@id",*/
/*     fields: [*/
/*         {% for field in fields %}*/
/*         { name: '{{ field.name|raw }}'{% if field.type%}, type: '{{ field.type }}'{% endif %}}{% if not loop.last %},{% endif %}*/
/* */
/*         {% endfor %}*/
/*         {% if associations.MANY_TO_ONE|length > 0 %}*/
/*             ,*/
/*             {% for association in associations.MANY_TO_ONE %}*/
/*                 { name: '{{ association.name }}',*/
/*                 reference: '{{ association.target }}'*/
/*                 }{% if not loop.last %},{% endif %}*/
/* */
/*             {% endfor %}*/
/*         {% endif %}*/
/*         {% if associations.ONE_TO_ONE|length > 0 %}*/
/*             ,*/
/*             {% for association in associations.ONE_TO_ONE %}*/
/*                 { name: '{{ association.name }}',*/
/*                 reference: '{{ association.target }}'*/
/*                 }{% if not loop.last %},{% endif %}*/
/* */
/*             {% endfor %}*/
/*         {% endif %}*/
/* */
/*     ],*/
/* */
/*     {% if associations.ONE_TO_MANY|length > 0 %}*/
/*     hasMany: [*/
/*     {% for association in associations.ONE_TO_MANY %}*/
/*         {*/
/*         name: '{{ association.name }}',*/
/*         associationKey: '{{ association.name }}',*/
/*         model: '{{ association.target }}'*/
/*         }{% if not loop.last %},{% endif %}*/
/* */
/*     {% endfor %}*/
/*     ],*/
/*     {% endif %}*/
/* */
/*     {% if associations.MANY_TO_MANY|length > 0 %}*/
/*     manyToMany: {*/
/*     {% for association in associations.MANY_TO_MANY %}*/
/*         {{ association.name }}: {*/
/*             type: '{{ association.target }}',*/
/*             role: '{{ association.name }}',*/
/*             field: '@id',*/
/*             right: true*/
/*         } {% if not loop.last %},{% endif %}*/
/*     {% endfor %}*/
/*     },*/
/*     {% endif %}*/
/* */
/*     proxy: {*/
/*         type: "Hydra",*/
/*         url: '{% if uri == "" %}undefined:{{ className }}{% else %}{{ uri|raw }}{% endif %}'*/
/*         {% if ignoreIds == true %}*/
/*         , ignoreIds: true*/
/*         {% endif %}*/
/*     }*/
/* });*/
/* */
