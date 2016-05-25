<?php

/* @Framework/FormTable/form_row.html.php */
class __TwigTemplate_7dd880e14bbe8d34b3666e2613aaffeb91851ebada5789a793a613a748565a44 extends Twig_Template
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
        $__internal_dd0650988102c329ef4670ba5c8ce9999c7f1ab7d340fd15d92cc6dd00a9c5d6 = $this->env->getExtension("native_profiler");
        $__internal_dd0650988102c329ef4670ba5c8ce9999c7f1ab7d340fd15d92cc6dd00a9c5d6->enter($__internal_dd0650988102c329ef4670ba5c8ce9999c7f1ab7d340fd15d92cc6dd00a9c5d6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/form_row.html.php"));

        // line 1
        echo "<tr>
    <td>
        <?php echo \$view['form']->label(\$form) ?>
    </td>
    <td>
        <?php echo \$view['form']->errors(\$form) ?>
        <?php echo \$view['form']->widget(\$form) ?>
    </td>
</tr>
";
        
        $__internal_dd0650988102c329ef4670ba5c8ce9999c7f1ab7d340fd15d92cc6dd00a9c5d6->leave($__internal_dd0650988102c329ef4670ba5c8ce9999c7f1ab7d340fd15d92cc6dd00a9c5d6_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/form_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <tr>*/
/*     <td>*/
/*         <?php echo $view['form']->label($form) ?>*/
/*     </td>*/
/*     <td>*/
/*         <?php echo $view['form']->errors($form) ?>*/
/*         <?php echo $view['form']->widget($form) ?>*/
/*     </td>*/
/* </tr>*/
/* */
