<?php

/* @Framework/FormTable/hidden_row.html.php */
class __TwigTemplate_52a6a2866df25218b28e79bcb33aadf6ec4578cab9e32266214575f9a73ec233 extends Twig_Template
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
        $__internal_19ad8c5d5fcae4f61355b02076ce3216923970cdab9669f8b6558e4b0e0d10f4 = $this->env->getExtension("native_profiler");
        $__internal_19ad8c5d5fcae4f61355b02076ce3216923970cdab9669f8b6558e4b0e0d10f4->enter($__internal_19ad8c5d5fcae4f61355b02076ce3216923970cdab9669f8b6558e4b0e0d10f4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/hidden_row.html.php"));

        // line 1
        echo "<tr style=\"display: none\">
    <td colspan=\"2\">
        <?php echo \$view['form']->widget(\$form) ?>
    </td>
</tr>
";
        
        $__internal_19ad8c5d5fcae4f61355b02076ce3216923970cdab9669f8b6558e4b0e0d10f4->leave($__internal_19ad8c5d5fcae4f61355b02076ce3216923970cdab9669f8b6558e4b0e0d10f4_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/hidden_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <tr style="display: none">*/
/*     <td colspan="2">*/
/*         <?php echo $view['form']->widget($form) ?>*/
/*     </td>*/
/* </tr>*/
/* */
