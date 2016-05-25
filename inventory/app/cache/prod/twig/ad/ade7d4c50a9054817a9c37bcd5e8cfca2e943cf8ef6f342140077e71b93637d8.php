<?php

/* JMSTranslationBundle:Translate:index.html.twig */
class __TwigTemplate_aefe94ff15f1dc00f815175fa4ac318bb38362652ab4962df2c75510c185d408 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("JMSTranslationBundle::base.html.twig", "JMSTranslationBundle:Translate:index.html.twig", 1);
        $this->blocks = array(
            'javascripts' => array($this, 'block_javascripts'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "JMSTranslationBundle::base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_16410f8da78ab0d3d4dc8b85d5fef485b1cc4c40bf6fad132d36a082a98ab1fd = $this->env->getExtension("native_profiler");
        $__internal_16410f8da78ab0d3d4dc8b85d5fef485b1cc4c40bf6fad132d36a082a98ab1fd->enter($__internal_16410f8da78ab0d3d4dc8b85d5fef485b1cc4c40bf6fad132d36a082a98ab1fd_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "JMSTranslationBundle:Translate:index.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_16410f8da78ab0d3d4dc8b85d5fef485b1cc4c40bf6fad132d36a082a98ab1fd->leave($__internal_16410f8da78ab0d3d4dc8b85d5fef485b1cc4c40bf6fad132d36a082a98ab1fd_prof);

    }

    // line 3
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_58ff52b578a8e04f45b217409969b01fb7f43172fb0e8d4921ae78fca478a0f1 = $this->env->getExtension("native_profiler");
        $__internal_58ff52b578a8e04f45b217409969b01fb7f43172fb0e8d4921ae78fca478a0f1->enter($__internal_58ff52b578a8e04f45b217409969b01fb7f43172fb0e8d4921ae78fca478a0f1_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        // line 4
        echo "    ";
        $this->displayParentBlock("javascripts", $context, $blocks);
        echo "
    
    <script language=\"javascript\" type=\"text/javascript\">
        \$(document).ready(function() {
            var updateMessagePath = ";
        // line 8
        echo twig_jsonencode_filter($this->env->getExtension('routing')->getPath("jms_translation_update_message", array("config" => (isset($context["selectedConfig"]) ? $context["selectedConfig"] : null), "domain" => (isset($context["selectedDomain"]) ? $context["selectedDomain"] : null), "locale" => (isset($context["selectedLocale"]) ? $context["selectedLocale"] : null))));
        echo ";
        
            \$('#config select').change(function() {
                \$(this).parent().submit();
            });
            
            ";
        // line 14
        if (((isset($context["isWriteable"]) ? $context["isWriteable"] : null) === true)) {
            // line 15
            echo "            \$('textarea')
                .blur(function() {
                    var self = this;
                    \$.ajax(updateMessagePath + '?id=' + encodeURIComponent(\$(this).data('id')), {
                        type: 'POST',
                        headers: {'X-HTTP-METHOD-OVERRIDE': 'PUT'},
                        data: {'_method': 'PUT', 'message': \$(this).val()},
                        beforeSend: function() {
                            \$(self).parent().closest('td').prev('td').children('.alert-message').remove();
                        },
                        error: function() {
                            \$(self).parent().closest('td').prev('td').append('<span class=\"alert-message label error\">Could not be saved.</span>');
                        },
                        success: function() {
                            \$(self).parent().closest('td').prev('td').append('<span class=\"alert-message label success\">Translation was saved.</span>');
                        },
                        complete: function() {
                            var parent = \$(self).parent();
                            \$(self).data('timeoutId', setTimeout(function() {
                                \$(self).data('timeoutId', undefined);
                                parent.closest('td').prev('td').children('.alert-message').fadeOut(300, function() { \$(this).remove(); });
                            }, 10000));
                        }
                    });
                })
                .focus(function() {
                    this.select();
                    
                    var timeoutId = \$(this).data('timeoutId');
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        \$(this).data('timeoutId', undefined);
                    }
                    
                    \$(this).parent().children('.alert-message').remove();
                })
            ;
            ";
        }
        // line 53
        echo "        });
    </script>
";
        
        $__internal_58ff52b578a8e04f45b217409969b01fb7f43172fb0e8d4921ae78fca478a0f1->leave($__internal_58ff52b578a8e04f45b217409969b01fb7f43172fb0e8d4921ae78fca478a0f1_prof);

    }

    // line 57
    public function block_body($context, array $blocks = array())
    {
        $__internal_e20149ed5bee8218d71d393f567f41394072043a080e66c7c47d49438d284d74 = $this->env->getExtension("native_profiler");
        $__internal_e20149ed5bee8218d71d393f567f41394072043a080e66c7c47d49438d284d74->enter($__internal_e20149ed5bee8218d71d393f567f41394072043a080e66c7c47d49438d284d74_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 58
        echo "
    <form id=\"config\" action=\"";
        // line 59
        echo $this->env->getExtension('routing')->getPath("jms_translation_index");
        echo "\" method=\"get\">
        <select name=\"config\" class=\"span3\">
            ";
        // line 61
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["configs"]) ? $context["configs"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["config"]) {
            // line 62
            echo "            <option value=\"";
            echo twig_escape_filter($this->env, $context["config"], "html", null, true);
            echo "\"";
            if (($context["config"] == (isset($context["selectedConfig"]) ? $context["selectedConfig"] : null))) {
                echo " selected=\"selected\"";
            }
            echo ">";
            echo twig_escape_filter($this->env, $context["config"], "html", null, true);
            echo "</option>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['config'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 64
        echo "        </select>
    
        <select name=\"domain\" class=\"span3\">
            ";
        // line 67
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["domains"]) ? $context["domains"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["domain"]) {
            // line 68
            echo "            <option value=\"";
            echo twig_escape_filter($this->env, $context["domain"], "html", null, true);
            echo "\"";
            if (($context["domain"] == (isset($context["selectedDomain"]) ? $context["selectedDomain"] : null))) {
                echo " selected=\"selected\"";
            }
            echo ">";
            echo twig_escape_filter($this->env, $context["domain"], "html", null, true);
            echo "</option>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['domain'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 70
        echo "        </select>
        
        <select name=\"locale\" class=\"span2\">
            ";
        // line 73
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["locales"]) ? $context["locales"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["locale"]) {
            // line 74
            echo "            <option value=\"";
            echo twig_escape_filter($this->env, $context["locale"], "html", null, true);
            echo "\"";
            if (($context["locale"] == (isset($context["selectedLocale"]) ? $context["selectedLocale"] : null))) {
                echo " selected=\"selected\"";
            }
            echo ">";
            echo twig_escape_filter($this->env, $context["locale"], "html", null, true);
            echo "</option>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['locale'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 76
        echo "        </select>
    </form>
    
    ";
        // line 79
        if (((isset($context["isWriteable"]) ? $context["isWriteable"] : null) === false)) {
            // line 80
            echo "    <div class=\"alert-message error\">
        The translation file \"<strong>";
            // line 81
            echo twig_escape_filter($this->env, (isset($context["file"]) ? $context["file"] : null), "html", null, true);
            echo "</strong>\" is not writable.
    </div>
    ";
        }
        // line 84
        echo "    
    ";
        // line 85
        if (("xliff" != (isset($context["format"]) ? $context["format"] : null))) {
            // line 86
            echo "    <div class=\"alert-message warning\">
        Due to limitations of the different loaders/dumpers, some features are unfortunately limited to the XLIFF format. 
        
        <br /><br />
        
        However, you can easily convert your existing translation files to the XLIFF format by running:<br />
        <code>php app/console translation:extract ";
            // line 92
            echo twig_escape_filter($this->env, (isset($context["selectedLocale"]) ? $context["selectedLocale"] : null), "html", null, true);
            echo " --config=";
            echo twig_escape_filter($this->env, (isset($context["selectedConfig"]) ? $context["selectedConfig"] : null), "html", null, true);
            echo " --output-format=xliff</code>
    </div>
    ";
        }
        // line 95
        echo "
    <h2>Available Messages</h2>
    
    ";
        // line 98
        if ( !twig_test_empty((isset($context["newMessages"]) ? $context["newMessages"] : null))) {
            // line 99
            echo "    <h3>New Messages</h3>
    ";
            // line 100
            $this->loadTemplate("JMSTranslationBundle:Translate:messages.html.twig", "JMSTranslationBundle:Translate:index.html.twig", 100)->display(array_merge($context, array("messages" => (isset($context["newMessages"]) ? $context["newMessages"] : null))));
            // line 101
            echo "    ";
        }
        // line 102
        echo "    
    ";
        // line 103
        if ( !twig_test_empty((isset($context["existingMessages"]) ? $context["existingMessages"] : null))) {
            // line 104
            echo "    <h3>Existing Messages</h3>
    ";
            // line 105
            $this->loadTemplate("JMSTranslationBundle:Translate:messages.html.twig", "JMSTranslationBundle:Translate:index.html.twig", 105)->display(array_merge($context, array("messages" => (isset($context["existingMessages"]) ? $context["existingMessages"] : null))));
            // line 106
            echo "    ";
        }
        // line 107
        echo "
";
        
        $__internal_e20149ed5bee8218d71d393f567f41394072043a080e66c7c47d49438d284d74->leave($__internal_e20149ed5bee8218d71d393f567f41394072043a080e66c7c47d49438d284d74_prof);

    }

    public function getTemplateName()
    {
        return "JMSTranslationBundle:Translate:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  255 => 107,  252 => 106,  250 => 105,  247 => 104,  245 => 103,  242 => 102,  239 => 101,  237 => 100,  234 => 99,  232 => 98,  227 => 95,  219 => 92,  211 => 86,  209 => 85,  206 => 84,  200 => 81,  197 => 80,  195 => 79,  190 => 76,  175 => 74,  171 => 73,  166 => 70,  151 => 68,  147 => 67,  142 => 64,  127 => 62,  123 => 61,  118 => 59,  115 => 58,  109 => 57,  100 => 53,  60 => 15,  58 => 14,  49 => 8,  41 => 4,  35 => 3,  11 => 1,);
    }
}
/* {% extends "JMSTranslationBundle::base.html.twig" %}*/
/* */
/* {% block javascripts %}*/
/*     {{ parent() }}*/
/*     */
/*     <script language="javascript" type="text/javascript">*/
/*         $(document).ready(function() {*/
/*             var updateMessagePath = {{ path("jms_translation_update_message", {"config": selectedConfig, "domain": selectedDomain, "locale": selectedLocale})|json_encode|raw }};*/
/*         */
/*             $('#config select').change(function() {*/
/*                 $(this).parent().submit();*/
/*             });*/
/*             */
/*             {% if isWriteable is sameas(true) %}*/
/*             $('textarea')*/
/*                 .blur(function() {*/
/*                     var self = this;*/
/*                     $.ajax(updateMessagePath + '?id=' + encodeURIComponent($(this).data('id')), {*/
/*                         type: 'POST',*/
/*                         headers: {'X-HTTP-METHOD-OVERRIDE': 'PUT'},*/
/*                         data: {'_method': 'PUT', 'message': $(this).val()},*/
/*                         beforeSend: function() {*/
/*                             $(self).parent().closest('td').prev('td').children('.alert-message').remove();*/
/*                         },*/
/*                         error: function() {*/
/*                             $(self).parent().closest('td').prev('td').append('<span class="alert-message label error">Could not be saved.</span>');*/
/*                         },*/
/*                         success: function() {*/
/*                             $(self).parent().closest('td').prev('td').append('<span class="alert-message label success">Translation was saved.</span>');*/
/*                         },*/
/*                         complete: function() {*/
/*                             var parent = $(self).parent();*/
/*                             $(self).data('timeoutId', setTimeout(function() {*/
/*                                 $(self).data('timeoutId', undefined);*/
/*                                 parent.closest('td').prev('td').children('.alert-message').fadeOut(300, function() { $(this).remove(); });*/
/*                             }, 10000));*/
/*                         }*/
/*                     });*/
/*                 })*/
/*                 .focus(function() {*/
/*                     this.select();*/
/*                     */
/*                     var timeoutId = $(this).data('timeoutId');*/
/*                     if (timeoutId) {*/
/*                         clearTimeout(timeoutId);*/
/*                         $(this).data('timeoutId', undefined);*/
/*                     }*/
/*                     */
/*                     $(this).parent().children('.alert-message').remove();*/
/*                 })*/
/*             ;*/
/*             {% endif %}*/
/*         });*/
/*     </script>*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/* */
/*     <form id="config" action="{{ path("jms_translation_index") }}" method="get">*/
/*         <select name="config" class="span3">*/
/*             {% for config in configs %}*/
/*             <option value="{{ config }}"{% if config == selectedConfig %} selected="selected"{% endif %}>{{ config }}</option>*/
/*             {% endfor %}*/
/*         </select>*/
/*     */
/*         <select name="domain" class="span3">*/
/*             {% for domain in domains %}*/
/*             <option value="{{ domain }}"{% if domain == selectedDomain %} selected="selected"{% endif %}>{{ domain }}</option>*/
/*             {% endfor %}*/
/*         </select>*/
/*         */
/*         <select name="locale" class="span2">*/
/*             {% for locale in locales %}*/
/*             <option value="{{ locale }}"{% if locale == selectedLocale %} selected="selected"{% endif %}>{{ locale }}</option>*/
/*             {% endfor %}*/
/*         </select>*/
/*     </form>*/
/*     */
/*     {% if isWriteable is sameas(false) %}*/
/*     <div class="alert-message error">*/
/*         The translation file "<strong>{{ file }}</strong>" is not writable.*/
/*     </div>*/
/*     {% endif %}*/
/*     */
/*     {% if "xliff" != format %}*/
/*     <div class="alert-message warning">*/
/*         Due to limitations of the different loaders/dumpers, some features are unfortunately limited to the XLIFF format. */
/*         */
/*         <br /><br />*/
/*         */
/*         However, you can easily convert your existing translation files to the XLIFF format by running:<br />*/
/*         <code>php app/console translation:extract {{ selectedLocale }} --config={{ selectedConfig }} --output-format=xliff</code>*/
/*     </div>*/
/*     {% endif %}*/
/* */
/*     <h2>Available Messages</h2>*/
/*     */
/*     {% if newMessages is not empty %}*/
/*     <h3>New Messages</h3>*/
/*     {% include "JMSTranslationBundle:Translate:messages.html.twig" with {"messages": newMessages} %}*/
/*     {% endif %}*/
/*     */
/*     {% if existingMessages is not empty %}*/
/*     <h3>Existing Messages</h3>*/
/*     {% include "JMSTranslationBundle:Translate:messages.html.twig" with {"messages": existingMessages} %}*/
/*     {% endif %}*/
/* */
/* {% endblock %}*/
/* */
